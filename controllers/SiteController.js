export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.campeonato = (req, res) => {
          res.render('site/campeonato');
        };

        this.inscricao = (req, res) => {
          res.render('site/inscricao');
        };

        this.sucesso = (req, res) => {
          res.render('site/sucesso');
        };
    }
}