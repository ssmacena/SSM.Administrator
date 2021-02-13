using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SSM.Administrator.Entity.Mapping
{
    public partial class SJSSEstadoMap : IEntityTypeConfiguration<SJSS_Estado>
    {
        public void Configure(EntityTypeBuilder<SJSS_Estado> builder)
        {
            #region Generated Configure
            // table
            builder.ToTable("SJSS_Estado", "dbo");

            // key
            builder.HasKey(t => t.Id);

            // properties
            builder.Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();

            builder.Property(t => t.CodigoUf)
                .IsRequired()
                .HasColumnName("CodigoUf")
                .HasColumnType("int");

            builder.Property(t => t.Nome)
                .IsRequired()
                .HasColumnName("Nome")
                .HasColumnType("varchar(50)")
                .HasMaxLength(50);

            builder.Property(t => t.Uf)
                .IsRequired()
                .HasColumnName("Uf")
                .HasColumnType("char(2)")
                .HasMaxLength(2);

            builder.Property(t => t.Regiao)
                .IsRequired()
                .HasColumnName("Regiao")
                .HasColumnType("int");

            // relationships
            #endregion
        }

        #region Generated Constants
        public struct Table
        {
            public const string Schema = "dbo";
            public const string Name = "SJSS_Estado";
        }

        public struct Columns
        {
            public const string Id = "Id";
            public const string CodigoUf = "CodigoUf";
            public const string Nome = "Nome";
            public const string Uf = "Uf";
            public const string Regiao = "Regiao";
        }
        #endregion
    }
}
