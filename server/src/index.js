import express from "express"
import "dotenv/config"
import nodemailer from "nodemailer"
import cors from "cors"
import multer from "multer"

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
    const { nome, email, senha } = req.body
    const usuario = { nome, email, senha }
    console.log(req.body)
    res.status(200).send(JSON.stringify({
      message: "Email enviado com sucesso",
      usuario
    }))
  } catch (error) {
    console.log(`${error.name}: ${error.message}`)
  }
})

app.post("/send", upload.none(), (req, res) => {
  const { nome, email, senha } = req.body
  const usuario = { nome, email, senha }
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
    subject: "teste de envio de email",
    html: "<p>Ola, muito obrigado por entrar em contato conosco</p>"
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
