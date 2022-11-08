using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models.Security;

namespace NinosConValorAPI.Data
{
    public class NCV_DBContext: IdentityDbContext<IdentityAppUser>
    { 
        public DbSet<FixedAssetEntity> FixedAssets => Set<FixedAssetEntity>();
        public DbSet<KidEntity> Kids => Set<KidEntity>();
        public DbSet<ProgramHouseEntity> ProgramHouses => Set<ProgramHouseEntity>();
        public DbSet<HealthReportEntity> HealthReports { get; set; }
        public DbSet<AssetCategoryEntity> AssetCategories => Set<AssetCategoryEntity>();
        public DbSet<BiometricsEntity> Biometrics { get; set; }
        public DbSet<EducationReportEntity> EducationReports { get; set; }

        public NCV_DBContext(DbContextOptions<NCV_DBContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("NinosConValorDB");
            optionsBuilder.UseNpgsql(connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //fixedAssets
            modelBuilder.Entity<FixedAssetEntity>().ToTable("FixedAsset");
            modelBuilder.Entity<FixedAssetEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<FixedAssetEntity>().HasOne(d => d.ProgramHouse).WithMany(d=>d.FixedAssets);
            modelBuilder.Entity<FixedAssetEntity>().HasOne(d => d.AssetCategory).WithMany(d => d.FixedAssets);

            modelBuilder.Entity<KidEntity>().ToTable("Kid");
            modelBuilder.Entity<KidEntity>().Property(d => d.Id).ValueGeneratedOnAdd();

            // Configure the primary key for the OfficeAssignment'

            // Configure the primary key for the OfficeAssignment
            modelBuilder.Entity<HealthReportEntity>().ToTable("HealthReports");
            modelBuilder.Entity<HealthReportEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
 
            //Biometrics
            modelBuilder.Entity<BiometricsEntity>().ToTable("Biometrics");
            modelBuilder.Entity<BiometricsEntity>().Property(d => d.Id).ValueGeneratedOnAdd();

            //ProgamHouses
            modelBuilder.Entity<ProgramHouseEntity>().ToTable("ProgramHouse");
            modelBuilder.Entity<ProgramHouseEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ProgramHouseEntity>().HasOne(d => d.ResponsibleUser);
            modelBuilder.Entity<ProgramHouseEntity>().HasMany(d => d.FixedAssets).WithOne(d => d.ProgramHouse);

            //Categories
            modelBuilder.Entity<AssetCategoryEntity>().ToTable("AssetCategory");
            modelBuilder.Entity<AssetCategoryEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<AssetCategoryEntity>().HasMany(d => d.FixedAssets).WithOne(d => d.AssetCategory);

            //Education
            modelBuilder.Entity<EducationReportEntity>().ToTable("EducationReports");
            modelBuilder.Entity<EducationReportEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
        }
    }
}
