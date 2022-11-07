using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models.Security;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.DBUT;

namespace UnitTests.NCVRepositoryUT
{
    
    public class FixedAssetUT:BaseTest
    {
        [Fact]
        public async Task CreateFixedAsset_AddFixedAssetToEmptyDB_ReturnsTrueSavedCorrectly()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };

            var assetCategory = new AssetCategoryEntity()
            {
                Id = 2,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State= "Obsoleto"
            };

            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 2);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
        }

        [Fact]
        public async Task CreateFixedAsset_AddFixedAssetToEmptyDB_ReturnsAddedFixedAssetWithNullFields()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };

            var assetCategory = new AssetCategoryEntity()
            {
                Id = 2,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };

            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 2);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1, fixedAsset.Id);
            Assert.Equal("TEC-489", fixedAsset.Code);
            Assert.Equal("Computadora", fixedAsset.Name);
            Assert.Null(fixedAsset.Description);
            Assert.Null(fixedAsset.EntryDate);
            Assert.Equal(100.58m, fixedAsset.Price);
            Assert.Null(fixedAsset.Features);
            Assert.Equal("Obsoleto", fixedAsset.State);
        }

        [Fact]
        public async Task CreateFixedAsset_AddFixedAssetToEmptyDB_ReturnsAddedFixedAssetWithNullFalse()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };

            var assetCategory = new AssetCategoryEntity()
            {
                Id = 2,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };

            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 2);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1, fixedAsset.Id);
            Assert.Equal("TEC-489", fixedAsset.Code);
            Assert.Equal("Computadora", fixedAsset.Name);
            Assert.Null(fixedAsset.Description);
            Assert.Null(fixedAsset.EntryDate);
            Assert.Equal(100.58m, fixedAsset.Price);
            Assert.Null(fixedAsset.Features);
            Assert.Equal("Obsoleto", fixedAsset.State);
        }

        [Fact]
        public async Task GetFixedAssets_ReturnListOfFixedAssets()
        {
            // CREATE 1 FIXED ASSET
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                ProgramHouse= programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };           
            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset,2,1);
            var result = await repository.SaveChangesAsync();

            // NUMBER OF FIXED ASSETS
            var listFixedAssets = await repository.GetFixedAssetsAsync();
            var numberOfFixedAssets = listFixedAssets.Count();
            Assert.Equal(1,numberOfFixedAssets);
        }

        [Fact]
        public async Task GetFixedAssets_ReturnFixedAssetName()
        {
            // CREATE 1 FIXED ASSET
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };
            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 1);
            var result = await repository.SaveChangesAsync();

            // NUMBER OF FIXED ASSETS
            var listFixedAssets = await repository.GetFixedAssetsAsync();
            //var numberOfFixedAssets = listFixedAssets.Count();
            Assert.Equal("Computadora", listFixedAssets.First().Name);
        }

        [Fact]
        public async Task GetFixedAsset_ReturnFixedAssetName()
        {
            // CREATE 1 FIXED ASSET
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };
            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 1);
            var result = await repository.SaveChangesAsync();

            // RETURN THE FIRST FIXED ASSET
            var firstFixedAsset = await repository.GetFixedAssetAsync(1);
            //var numberOfFixedAssets = listFixedAssets.Count();
            Assert.Equal("Computadora", firstFixedAsset.Name);
        }

        [Fact]
        public async Task GetFixedAsset_ReturnFixedAssetPrice()
        {
            // CREATE 1 FIXED ASSET
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                ProgramHouse = programHouse,
                AssetCategory = assetCategory,
                State = "Obsoleto"
            };
            ctx.Add(programHouse);
            ctx.Add(assetCategory);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2, 1);
            var result = await repository.SaveChangesAsync();

            // RETURN THE FIRST FIXED ASSET
            var firstFixedAsset = await repository.GetFixedAssetAsync(1);
            //var numberOfFixedAssets = listFixedAssets.Count();
            Assert.Equal(100.58m, firstFixedAsset.Price);
        }
    }
}
