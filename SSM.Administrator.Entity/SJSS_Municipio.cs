using System;
using System.Collections.Generic;
using System.Text;

namespace SSM.Administrator.Entity
{
    public class SJSS_Municipio
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Uf { get; set; }

        #region Generated Relationships
        public virtual SJSS_Estado SJSSEstado { get; set; }

        #endregion
    }
}
