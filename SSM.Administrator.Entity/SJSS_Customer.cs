using System;
using System.Collections.Generic;
using System.Text;

namespace SSM.Administrator.Entity
{
    public class SJSS_Customer
    {
        public int Id { get; set; }
        public string NM_Cliente { get; set; }
        public string DS_Email { get; set; }
        public string DS_EmailConfirmar { get; set; }
        public string DS_Cep { get; set; }
        public int? NR_Endereco { get; set; }
        public string DS_Complemento { get; set; }
        public string DS_Rua { get; set; }
        public string DS_Bairro { get; set; }
        public string SG_Estado { get; set; }
        public string DS_Cidade { get; set; }
        public DateTime DT_Criacao { get; set; }
        public string ID_UserCriacao { get; set; }
        public DateTime? DT_Alteracao { get; set; }
        public string ID_UserAlteracao { get; set; }
    }
}
