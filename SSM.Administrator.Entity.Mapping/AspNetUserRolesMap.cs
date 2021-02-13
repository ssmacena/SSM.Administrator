using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SSM.Administrator.Entity.Mapping
{
    public partial class AspNetUserRolesMap : IEntityTypeConfiguration<AspNetUserRoles>
    {
        public void Configure(EntityTypeBuilder<AspNetUserRoles> builder)
        {
            #region Generated Configure
            // table
            builder.ToTable("AspNetUserRoles", "dbo");

            // key
            builder.HasKey(t => new { t.UserId, t.RoleId });

            // properties
            builder.Property(t => t.UserId)
                .IsRequired()
                .HasColumnName("UserId")
                .HasColumnType("nvarchar(450)")
                .HasMaxLength(450);

            builder.Property(t => t.RoleId)
                .IsRequired()
                .HasColumnName("RoleId")
                .HasColumnType("nvarchar(450)")
                .HasMaxLength(450);

            // relationships
            builder.HasOne(t => t.RoleAspNetRoles)
                .WithMany(t => t.RoleAspNetUserRoles)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_AspNetUserRoles_AspNetRoles_RoleId");

            builder.HasOne(t => t.UserAspNetUsers)
                .WithMany(t => t.UserAspNetUserRoles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AspNetUserRoles_AspNetUsers_UserId");

            #endregion
        }

        #region Generated Constants
        public struct Table
        {
            public const string Schema = "dbo";
            public const string Name = "AspNetUserRoles";
        }

        public struct Columns
        {
            public const string UserId = "UserId";
            public const string RoleId = "RoleId";
        }
        #endregion
    }
}
