using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SSM.Administrator.Entity
{
    public partial class Session
    {
        public int Id { get; set; }
        public string SessionCode { get; set; }
        public string Login { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpdateOn { get; set; }
        public string LastUpdateBy { get; set; }
        public Boolean Active { get; set; }
    }
}
