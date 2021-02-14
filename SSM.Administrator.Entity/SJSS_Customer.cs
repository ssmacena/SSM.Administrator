using System;
using System.Collections.Generic;
using System.Text;

namespace SSM.Administrator.Entity
{
    public class Clientes
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string EmailConfirmar { get; set; }
        public string Cep { get; set; }
        public int? NumeroEndereco { get; set; }
        public string Complemento { get; set; }
        public string Rua { get; set; }
        public string Bairro { get; set; }
        public string SiglaEstado { get; set; }
        public string Cidade { get; set; }
        public DateTime DataCriacao { get; set; }
        public string IdUserCriacao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public string IdUserAlteracao { get; set; }
    }
}
