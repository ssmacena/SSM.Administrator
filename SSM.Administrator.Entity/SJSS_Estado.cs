using System;
using System.Collections.Generic;
using System.Text;

namespace SSM.Administrator.Entity
{
    public class SJSS_Estado
    {
        public SJSS_Estado()
        {
            #region Generated Constructor
            SJSSMunicipios = new HashSet<SJSS_Municipio>();
            #endregion
        }
        public int Id { get; set; }
        public int CodigoUf { get; set; }
        public string Nome { get; set; }
        public string Uf { get; set; }
        public int Regiao { get; set; }

        #region Generated Relationships
        public virtual ICollection<SJSS_Municipio> SJSSMunicipios { get; set; }

        #endregion
    }
}
