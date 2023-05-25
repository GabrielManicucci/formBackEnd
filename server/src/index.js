import * as dotenv from "dotenv"
import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"
import multer from "multer"

dotenv.config()
const app = express()
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/home", (req, res) => {
  res.status(200).send(JSON.stringify({ name: "teste" }))
})

app.post("/get", upload.none(), (req, res) => {
  try {
    const { nome, email, textarea } = req.body
    const usuario = { nome, email, textarea }
    console.log(req.body)
    console.log(usuario)
    res.status(200).send(JSON.stringify({
      message: "Email enviado com sucesso",
      usuario
    }))
  } catch (error) {
    console.log(`${error.name}: ${error.message}`)
  }
})

app.post("/send", upload.none(), (req, res) => {
  const { nome, email, textarea } = req.body
  const usuario = { nome, email, textarea }
  // console.log(usuario)
  console.log(req)
 

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email enviado de Projeto formulário de Gabriel Manicucci",
    html: `
    <p>Sua menssagem aqui: ${textarea}</p><br>
    <p>Ola, muito obrigado por entrar em contato comigo, você recebeu um email após entrar em contato pelo link https://form-front-end.vercel.app. Este é um projeto de estudos de autoria propria que permite ao usuário entrar em contato por email enviando dados através de um formuário em um site. Então se você acessou este link e entrou em contato aqui estão meus dados => github: https://github.com/GabrielManicucci  /  Linkedin: https://www.linkedin.com/in/gabriel-manicucci/</p>
    `
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error)
      res.status(500).send(error.message)
    } else {
      console.log(`Email enviado: ${info.response}`)
      res.status(200).send(JSON.stringify({message: "Email enviado com sucesso"}))
    }
  })
})

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`)
)
