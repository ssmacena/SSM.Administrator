using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SSM.Administrator.Entity.Mapping
{
    public partial class SJSSCustomerMap : IEntityTypeConfiguration<Clientes>
    {
        public void Configure(EntityTypeBuilder<Clientes> builder)
        {
            #region Generated Configure
            // table
            builder.ToTable("SJSS_Customer", "dbo");

            // key
            builder.HasKey(t => t.Id);

            // properties
            builder.Property(t => t.Id)
                .IsRequired()
                .HasColumnName("Id")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();

            builder.Property(t => t.Nome)
                .IsRequired()
                .HasColumnName("NM_Cliente")
                .HasColumnType("varchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.Email)
                .IsRequired()
                .HasColumnName("DS_Email")
                .HasColumnType("nvarchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.EmailConfirmar)
                .IsRequired()
                .HasColumnName("DS_EmailConfirmar")
                .HasColumnType("nvarchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.Cep)
                .IsRequired()
                .HasColumnName("DS_Cep")
                .HasColumnType("nvarchar(15)")
                .HasMaxLength(15);

            builder.Property(t => t.NumeroEndereco)
                .HasColumnName("NR_Endereco")
                .HasColumnType("int");

            builder.Property(t => t.Complemento)
                .HasColumnName("DS_Complemento")
                .HasColumnType("nvarchar(512)")
                .HasMaxLength(512);

            builder.Property(t => t.Rua)
                .IsRequired()
                .HasColumnName("DS_Rua")
                .HasColumnType("nvarchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.Bairro)
                .IsRequired()
                .HasColumnName("DS_Bairro")
                .HasColumnType("nvarchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.SiglaEstado)
                .IsRequired()
                .HasColumnName("SG_Estado")
                .HasColumnType("nvarchar(5)")
                .HasMaxLength(5);

            builder.Property(t => t.Cidade)
                .IsRequired()
                .HasColumnName("DS_Cidade")
                .HasColumnType("nvarchar(256)")
                .HasMaxLength(256);

            builder.Property(t => t.DataCriacao)
                .IsRequired()
                .HasColumnName("DT_Criacao")
                .HasColumnType("datetime");

            builder.Property(t => t.IdUserCriacao)
                .IsRequired()
                .HasColumnName("ID_UserCriacao")
                .HasColumnType("nvarchar(450)")
                .HasMaxLength(450);

            builder.Property(t => t.DataAlteracao)
                .HasColumnName("DT_Alteracao")
                .HasColumnType("datetime");

            builder.Property(t => t.IdUserAlteracao)
                .HasColumnName("ID_UserAlteracao")
                .HasColumnType("nvarchar(450)")
                .HasMaxLength(450);

            // relationships
            #endregion
        }

        #region Generated Constants
        public struct Table
        {
            public const string Schema = "dbo";
            public const string Name = "SJSS_Customer";
        }

        public struct Columns
        {
            public const string Id = "Id";
            public const string NMCliente = "NM_Cliente";
            public const string DSEmail = "DS_Email";
            public const string DSEmailConfirmar = "DS_EmailConfirmar";
            public const string DSCep = "DS_Cep";
            public const string NREndereco = "NR_Endereco";
            public const string DSComplemento = "DS_Complemento";
            public const string DSRua = "DS_Rua";
            public const string DSBairro = "DS_Bairro";
            public const string SGEstado = "SG_Estado";
            public const string DSCidade = "DS_Cidade";
            public const string DTCriacao = "DT_Criacao";
            public const string IDUserCriacao = "ID_UserCriacao";
            public const string DTAlteracao = "DT_Alteracao";
            public const string IDUserAlteracao = "ID_UserAlteracao";
        }
        #endregion
    }
}
