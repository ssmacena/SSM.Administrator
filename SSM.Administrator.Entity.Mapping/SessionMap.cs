using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SSM.Administrator.Entity.Mapping
{
    public class SessionMap : IEntityTypeConfiguration<Session>
    {
        void IEntityTypeConfiguration<Session>.Configure(EntityTypeBuilder<Session> builder)
        {
            // Primary Key
            builder.HasKey(t => t.Id);

            // Table & Column Mappings
            builder.ToTable("Session", "adm");

            builder.Property(t => t.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();

            builder.Property(x => x.SessionCode)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(x => x.Login)
                .HasMaxLength(254);

            builder.Property(x => x.CreatedOn)
                .IsRequired();

            builder.Property(x => x.CreatedBy)
                .IsRequired();

            builder.Property(x => x.LastUpdateOn);

            builder.Property(x => x.LastUpdateBy)
                .HasMaxLength(254);

            builder.Property(x => x.Active);
        }
    }
}