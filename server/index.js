import express from "express"
import "dotenv/config"
import cors from "cors"
import nodemailer from "nodemailer"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const myPerson = { name: 'Gabriel'}

app.get("/home", (req, res) => {

  console.log(req.body)
  res.status(200).send(JSON.stringify(myPerson))
})

app.post('/get', (req, res) => {
  const {nome, email, senha} = req.body

  console.log(req.body)
  res.status(200).send(nome, email, senha)
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
