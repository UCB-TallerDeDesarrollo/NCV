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

            var assetType = new AssetTypeEntity()
            {
                Id = 2,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };

            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
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

            var assetType = new AssetTypeEntity()
            {
                Id = 2,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };

            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1, fixedAsset.Id);
            Assert.Equal("TEC-489", fixedAsset.Code);
            Assert.Equal("Computadora", fixedAsset.Name);
            Assert.Equal(100.58m, fixedAsset.Price);
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

            var assetType = new AssetTypeEntity()
            {
                Id = 2,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };

            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1, fixedAsset.Id);
            Assert.Equal("TEC-489", fixedAsset.Code);
            Assert.Equal("Computadora", fixedAsset.Name);
            Assert.Equal(100.58m, fixedAsset.Price);
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
            var assetType = new AssetTypeEntity()
            {
                Id = 1,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse= programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };           
            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset,2);
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
            var assetType = new AssetTypeEntity()
            {
                Id = 1,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };
            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
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
            var assetType = new AssetTypeEntity()
            {
                Id = 1,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible=assetResponsible
            };
            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
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
            var assetType = new AssetTypeEntity()
            {
                Id = 1,
                Type = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var assetResponsible = new AssetResponsibleEntity()
            {
                Id = 1,
                Name = "Javier"
            };
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
                ProgramHouse = programHouse,
                AssetType = assetType,
                AssetState = assetState,
                AssetResponsible = assetResponsible
            };
            ctx.Add(programHouse);
            ctx.Add(assetType);
            ctx.SaveChanges();
            repository.CreateFixedAsset(fixedAsset, 2);
            var result = await repository.SaveChangesAsync();

            // RETURN THE FIRST FIXED ASSET
            var firstFixedAsset = await repository.GetFixedAssetAsync(1);
            //var numberOfFixedAssets = listFixedAssets.Count();
            Assert.Equal(100.58m, firstFixedAsset.Price);
        }
    }
}
