import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno:123@cluster0.lx7jygg.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao