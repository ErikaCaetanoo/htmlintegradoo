import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

if (!url) {
    throw new Error("Configure a variável de ambiente MONGODB_URI antes de iniciar o servidor.");
}

const conexao = await mongoose.connect(url);

export default conexao;