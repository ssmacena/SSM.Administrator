using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SSM.Administrator.Entity;
using SSM.Administrator.Entity.Mapping;
//using SSM.Administrator.Entity.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.Data
{
	public class DataContextSet : DbContext
	{
		public DbSet<AspNetUsers> AspNetUsers { get; set; }
		public DbSet<Session> Session { get; set; }
		public DbSet<SJSS_Customer> SJSS_Customer { get; set; }
		public DbSet<SJSS_Estado> SJSS_Estado { get; set; }
		public DbSet<SJSS_Municipio> SJSS_Municipio { get; set; }
		//...

		public DataContextSet(DbContextOptions<DataContextSet> options) : base(options)
		{
			//...

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(SessionMap).Assembly); // Here UseConfiguration is any IEntityTypeConfiguration

			//if (this.Mapping != null)
			//{
			//modelBuilder.ApplyConfiguration<AspNetUsersMap>().Configurations.AddFromAssembly(this.Mapping);
			//modelBuilder.Conventions.AddFromAssembly(this.Mapping);
			//}

			//if (this.ConventionsMapping != null)
			//	modelBuilder.Conventions.AddFromAssembly(this.ConventionsMapping);

			//if (this.IgnoredTypes != null)
			//	modelBuilder.Ignore(this.IgnoredTypes);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			//optionsBuilder.UseSqlServer(Configuration.GetConnectionString("ConnStr"));
		}
	}
}
