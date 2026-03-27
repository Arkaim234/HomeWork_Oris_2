using Microsoft.EntityFrameworkCore;
using OneToche.API.Entities;

namespace OneToche.API.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<CountryEntity> Countries => Set<CountryEntity>();
        public DbSet<CityEntity> Cities => Set<CityEntity>();
        public DbSet<HotelEntity> Hotels => Set<HotelEntity>();
        public DbSet<HotelCategoryEntity> HotelCategories => Set<HotelCategoryEntity>();
        public DbSet<HotelCategoryMapEntity> HotelCategoryMaps => Set<HotelCategoryMapEntity>();
        public DbSet<HotelDescriptionEntity> HotelDescriptions => Set<HotelDescriptionEntity>();
        public DbSet<HotelPlaceInfoEntity> HotelPlaceInfos => Set<HotelPlaceInfoEntity>();
        public DbSet<HotelServiceEntity> HotelServices => Set<HotelServiceEntity>();
        public DbSet<MealPlanEntity> MealPlans => Set<MealPlanEntity>();
        public DbSet<HotelMealPlanEntity> HotelMealPlans => Set<HotelMealPlanEntity>();
        public DbSet<RoomTypeEntity> RoomTypes => Set<RoomTypeEntity>();
        public DbSet<UserEntity> Users => Set<UserEntity>();
        public DbSet<HotelPhotoEntity> HotelPhotos => Set<HotelPhotoEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CountryEntity>().ToTable("Countries");
            modelBuilder.Entity<CityEntity>().ToTable("Cities");
            modelBuilder.Entity<HotelEntity>().ToTable("Hotels");
            modelBuilder.Entity<HotelCategoryEntity>().ToTable("HotelCategories");
            modelBuilder.Entity<HotelCategoryMapEntity>().ToTable("HotelCategoryMaps");
            modelBuilder.Entity<HotelDescriptionEntity>().ToTable("HotelDescriptions");
            modelBuilder.Entity<HotelPlaceInfoEntity>().ToTable("HotelPlaceInfos");
            modelBuilder.Entity<HotelServiceEntity>().ToTable("HotelServices");
            modelBuilder.Entity<MealPlanEntity>().ToTable("MealPlans");
            modelBuilder.Entity<HotelMealPlanEntity>().ToTable("HotelMealPlans");
            modelBuilder.Entity<RoomTypeEntity>().ToTable("RoomTypes");
            modelBuilder.Entity<UserEntity>().ToTable("Users");
            modelBuilder.Entity<HotelPhotoEntity>().ToTable("HotelPhotos");

            modelBuilder.Entity<CountryEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<CityEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelCategoryEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelDescriptionEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelPlaceInfoEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelServiceEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<MealPlanEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<RoomTypeEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<UserEntity>().Property(x => x.Id).ValueGeneratedNever();
            modelBuilder.Entity<HotelPhotoEntity>().Property(x => x.Id).ValueGeneratedNever();

            modelBuilder.Entity<HotelCategoryMapEntity>()
                .HasKey(x => new { x.HotelId, x.CategoryId });

            modelBuilder.Entity<HotelMealPlanEntity>()
                .HasKey(x => new { x.HotelId, x.MealPlanId });

            modelBuilder.Entity<CityEntity>()
                .HasOne(x => x.Country)
                .WithMany(x => x.Cities)
                .HasForeignKey(x => x.CountryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelEntity>()
                .HasOne(x => x.City)
                .WithMany(x => x.Hotels)
                .HasForeignKey(x => x.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelCategoryMapEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelCategoryMaps)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelCategoryMapEntity>()
                .HasOne(x => x.Category)
                .WithMany(x => x.HotelCategoryMaps)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelDescriptionEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelDescriptions)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelPlaceInfoEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelPlaceInfos)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelServiceEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelServices)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RoomTypeEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.RoomTypes)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelPhotoEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelPhotos)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelMealPlanEntity>()
                .HasOne(x => x.Hotel)
                .WithMany(x => x.HotelMealPlans)
                .HasForeignKey(x => x.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelMealPlanEntity>()
                .HasOne(x => x.MealPlan)
                .WithMany(x => x.HotelMealPlans)
                .HasForeignKey(x => x.MealPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MealPlanEntity>()
                .HasIndex(x => x.Code)
                .IsUnique();
        }
    }
}