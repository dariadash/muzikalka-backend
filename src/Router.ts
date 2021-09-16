import { Song } from 'entities/Song';
import { User } from 'entities/User';
import {Router} from 'express';
import { JWT_SECRET_KEY } from './passport';
import { FindManyOptions, getConnection, getRepository, Like } from 'typeorm';
import { getEntityManager } from './dbconnection';
import {upload} from './multer-middleware';
import { getArtistAndSongname } from 'helper/music-metadata';

const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = Router()

router.get('/', (req, res, next) => {
    res.send('respond with a resource')
})

router.use('/profile',passport.authenticate('jwt'));
router.get('/profile', (req, res) => {
    res.json(req.user)
})
router.post('/profile/upload', upload.array('songs', 10), async (req, res, next) => {
    const files = req.files as Express.Multer.File[];
    if(files.length === 0){
        res
            .status(500)
            .send("Ошибка при загрузке файла")
        return;
    }
    res.send("Файл загружен")
    const entityManager = getEntityManager()
    for (const file of files) {
        const [artist, songname, duration, picture] = await getArtistAndSongname(file.filename)
        const songs = entityManager.create(Song, {
            artist,
            songname,
            fileName: file.filename,
            duration,
            picture
        })
        await entityManager.save(songs)
    }
})

router.post('/registration', async (req, res) => {
    res.send('hi');
    const entityManager = getEntityManager()
    const user = entityManager.create(User, req.body)
    await entityManager.save(user)
})

router.post('/auth', async (req,res) => {
    const { login, password } = req.body
    const user = await getConnection().getRepository(User).findOne({
        where:{
            login,password
        },
    });
    if (!user) {
        res.status(401)
        .json({
            msg: "Неправильный логин или пароль"
        })
    }
    passport.authenticate('jwt', {session: false}, () => {
        req.login(user, {session: false}, (err) => {
          if (err) {
            res.send(err)
          }
          const token = jwt.sign({user}, JWT_SECRET_KEY)
          return  res.json({token})
        })
      })(req, res)
})

router.use('/songs',passport.authenticate('jwt'));
router.get('/songs', async (req: any, res) => {
    const filter = req.query.filter 

    let qbuilder = getConnection()
        .createQueryBuilder()
        .from(Song,'s')
        .leftJoin('user_music','um','s.id = um.song_id AND um.user_id = :ID', {ID: req.user.id})
    
    if (filter !== '') {
        qbuilder = qbuilder.andWhere('s.filename LIKE :filename',{
            filename: `%${filter}%`
        })
    }

    const songs = await qbuilder.getRawMany()
    console.log(songs)
    res.json(songs)
})
router.post('/songs/like', async (req: any, res) => {
    const {song_id} = req.body
    const user_id = req.user.id
    const existRaw = await getConnection()
        .query(`select count(user_id) as count from user_music where user_id = ? and song_id = ?`,[user_id,song_id])
    if (existRaw[0].count > 0) {
        res.send('Дублирование запрещено')
        return
    }
    await getConnection()
        .query(`INSERT into user_music (user_id, song_id) values (?,?)`,[user_id,song_id]);
    res.send('done')
})
router.post('/songs/dislike', async (req: any, res) => {
    const {song_id} = req.body
    const user_id = req.user.id
    await getConnection()
        .query(`DELETE from user_music where user_id = ? and song_id = ?`,[user_id,song_id]);
    res.send('done')
})

export { router }