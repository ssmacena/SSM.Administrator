using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SSM.Administrator.Entity.Mapping
{
    public class AspNetUsersMap : IEntityTypeConfiguration<AspNetUsers>
    {
        void IEntityTypeConfiguration<AspNetUsers>.Configure(EntityTypeBuilder<AspNetUsers> builder)
        {
            // Primary Key
            builder.HasKey(t => t.Id);

            // Table & Column Mappings
            builder.ToTable("AspNetUsers", "dbo");

            builder.Property(t => t.Id)
                .HasColumnName("Id")
                .IsRequired();

            builder.Property(x => x.UserName)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(x => x.NormalizedUserName)
                .HasMaxLength(256);

            builder.Property(x => x.Email)
                .HasMaxLength(256);

            builder.Property(x => x.NormalizedEmail)
                .HasMaxLength(256);

            builder.Property(x => x.EmailConfirmed)
                .IsRequired();

            builder.Property(x => x.PasswordHash);

            builder.Property(x => x.SecurityStamp);

            builder.Property(x => x.ConcurrencyStamp);

            builder.Property(x => x.PhoneNumber);

            builder.Property(x => x.PhoneNumberConfirmed);

            builder.Property(x => x.TwoFactorEnabled);

            builder.Property(x => x.LockoutEnd);

            builder.Property(x => x.LockoutEnabled);

            builder.Property(x => x.AccessFailedCount);
        }
    }
}