using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Data
{
    public class NCV_DBContext : DbContext
    {
        public DbSet<FixedAssetEntity> FixedAssets => Set<FixedAssetEntity>();
        public DbSet<KidEntity> Kids => Set<KidEntity>();

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
            modelBuilder.Entity<FixedAssetEntity>().ToTable("FixedAsset");
            modelBuilder.Entity<FixedAssetEntity>().Property(d => d.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<KidEntity>().ToTable("Kid");
            modelBuilder.Entity<KidEntity>().Property(d => d.Id).ValueGeneratedOnAdd();

        }
    }
}