using BNPP.Framework.Common.DataManipulation;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.Entity
{
    [DefaultValue(None)]
    public enum Permission : int
    {
        None = 0,

        [StringValue("D_DWH_ASSET_EXTRACTION_TB_PAGP_DEPARA")]
        ViewPagpDePara,
    }
}
