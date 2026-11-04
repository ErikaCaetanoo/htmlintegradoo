import conexao from '../config/conexao.js';

const Atleta = conexao.Schema({
    nome: {
        type: String,
        required: true
    },

    dataNasc: {
        type: Date,
        required: true
    },

    equipe: {
        type: String,
        required: true
    },

    foto: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;

            return `data:image/jpeg;base64,${valor.toString('base64')}`;
        }
    }
});

export default conexao.model('Atleta', Atleta);