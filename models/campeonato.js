import conexao from '../config/conexao.js';

const Campeonato = conexao.Schema({
    nomeEve: {
        type: String,
        required: true
    },

    cidade: {
        type: String,
        required: true
    },

    dataEve: {
        type: Date,
        required: true
    },

    organizador: {
        type: String,
        required: true
    },

    categorias: {
        type: [String],
        required: true
    },

    atletas: [{
        type: conexao.Schema.Types.ObjectId,
        ref: 'Atleta'
    }]
});

export default conexao.model('Campeonato', Campeonato);