using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SSM.Administrator.Entity.Mapping
{
    public partial class SJSSMunicipioMap : IEntityTypeConfiguration<SJSS_Municipio>
    {
        public void Configure(EntityTypeBuilder<SJSS_Municipio> builder)
        {
            #region Generated Configure
            // table
            builder.ToTable("SJSS_Municipio", "dbo");

            // key
            builder.HasKey(t => t.Id);

            // properties
            builder.Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();

            builder.Property(t => t.Codigo)
                .IsRequired()
                .HasColumnName("Codigo")
                .HasColumnType("int");

            builder.Property(t => t.Nome)
                .IsRequired()
                .HasColumnName("Nome")
                .HasColumnType("varchar(255)")
                .HasMaxLength(255);

            builder.Property(t => t.Uf)
                .IsRequired()
                .HasColumnName("Uf")
                .HasColumnType("char(2)")
                .HasMaxLength(2);

            // relationships
            builder.HasOne(t => t.SJSSEstado)
                .WithMany(t => t.SJSSMunicipios)
                .HasForeignKey(d => d.Uf)
                .HasConstraintName("FK_SJSS_Municipio_SJSS_Estado");

            #endregion
        }

        #region Generated Constants
        public struct Table
        {
            public const string Schema = "dbo";
            public const string Name = "SJSS_Municipio";
        }

        public struct Columns
        {
            public const string Id = "Id";
            public const string Codigo = "Codigo";
            public const string Nome = "Nome";
            public const string Uf = "Uf";
        }
        #endregion
    }
}
