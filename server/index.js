import express from "express"
import "dotenv/config"

import nodemailer from "nodemailer"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/home", (req, res) => {
  res.status(200).send("<h1>hello world</h1>")
})

app.post("/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const message = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Message title",
    html: "<p>Ola, muito obrigado por entrar em contato conosco</p>"
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error)
      res.status(500).send("Erro ao enviar email")
    } else {
      console.log(`Email enviado: ${info.response}`)
      res.status(200).send("Email enviado com sucesso")
    }
  })
})

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`)
)
