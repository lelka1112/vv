import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
let set
if (/басс/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
if (/взорван/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/глубокий/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/раковина/.test(command)) set = '-af volume=12'
if (/быстрый/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/найткор/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/обратный/.test(command)) set = '-filter_complex "areverse"'
if (/робот/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/медленный/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/гладкий/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
let ran = getRandom('.mp3')
let filename = join(__dirname, '../tmp/' + ran)
let media = await q.download(true)
exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
await unlinkSync(media)
if (err) throw `_*Error!*_`
let buff = await readFileSync(filename)
conn.sendFile(m.chat, buff, ran, null, m, true, {
type: 'audioMessage', 
ptt: true 
})})
} else throw `*[❗ИНФО❗] Отвечайте на звуковую или голосовую заметку, которая будет изменена, используя команду ${usedPrefix + command}${usedPrefix + command}*`
} catch (e) {
throw e
}}
handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai'].map(v => v + ' [vn]')
handler.tags = ['audio']
handler.command = /^(басс|взорван|глубокий|раковина|быстрый|найткор|обратный|робот|медленный|гладкий|tupai|squirrel|chipmunk)$/i

export default handler

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`}

