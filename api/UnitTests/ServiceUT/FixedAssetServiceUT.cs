using AutoMapper;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ServiceUT
{
    public class FixedAssetServiceUT
    {
        [Fact]
        public async Task CreateFixedAsset_ReturnsAddedFixedAsset()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };
            var fixedAssetEntity = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                AssetCategory = assetCategory,
                AssetState = assetState
            };
            var fixedAssetModel = mapper.Map<FixedAssetModel>(fixedAssetEntity);
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetProgramHouseAsync(2)).ReturnsAsync(new ProgramHouseEntity());
            fixedAssetRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(new AssetStateEntity());

            fixedAssetRepositoryMock.Setup(r => r.CreateFixedAsset(fixedAssetEntity,2,1));
            fixedAssetRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var fixedAssetAdded = await fixedAssetService.CreateFixedAssetAsync(fixedAssetModel,2,1);
            Assert.Equal("Computadora",fixedAssetAdded.Name);
        }

        [Fact]
        public async Task GetFixedAssets_ReturnAllFixedAssets()
        {
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset1 = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                AssetCategory = assetCategory
            };

            var fixedAsset2 = new FixedAssetEntity()
            {
                Id = 2,
                Name = "Silla",
                Description = "Silla de Madera",
                EntryDate = new DateTime(2006, 6, 6),
                Price = 20.32m,
                Features = "Tachas de oro",
                AssetCategory = assetCategory
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<FixedAssetEntity>() { fixedAsset1, fixedAsset2 } as IEnumerable<FixedAssetEntity>;
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetFixedAssetsAsync()).ReturnsAsync(enumerable);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var listFixedAssets = await fixedAssetService.GetFixedAssetsAsync();
            Assert.Equal(2, listFixedAssets.Count());
        }

        [Fact]
        public async Task GetFixedAsset_ReturnIdFixedAsset()
        {
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAsset1 = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                AssetCategory = assetCategory
            };

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetFixedAssetAsync(1)).ReturnsAsync(fixedAsset1);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var fixedAsset = await fixedAssetService.GetFixedAssetAsync(1);
            Assert.Equal(1, fixedAsset.Id);
        }

        [Fact]
        public void GetFixedAsset_ReturnNotFoundIdFixedAsset()
        {
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            FixedAssetEntity fixedAsset = new FixedAssetEntity() { AssetCategory = assetCategory };

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetFixedAssetAsync(1)).ReturnsAsync(fixedAsset);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await fixedAssetService.GetFixedAssetAsync(2));
            Assert.Equal($"El activo fijo con Id:2 no existe.", ex.Result.Message);
        }

        [Fact]
        public void GetFixedAssets_ReturnNotFoundFixedAssets()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<FixedAssetEntity>() { } as IEnumerable<FixedAssetEntity>;
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetFixedAssetsAsync()).ReturnsAsync(enumerable);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await fixedAssetService.GetFixedAssetsAsync());
            Assert.Equal("La lista de Activos Fijos no existe o está vacía.", ex.Result.Message);
        }

        [Fact]
        public void CreateFixedAsset_ReturnsDataBaseErrorCreatingFixedAsset()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetEntity = new FixedAssetEntity() { };
            var fixedAssetModel = new FixedAssetModel() { AssetStateId = 1};
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetProgramHouseAsync(2)).ReturnsAsync(new ProgramHouseEntity());
            fixedAssetRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(new AssetStateEntity());
            fixedAssetRepositoryMock.Setup(r => r.CreateFixedAsset(fixedAssetEntity,2,1));
            fixedAssetRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(false);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<Exception>(async () => await fixedAssetService.CreateFixedAssetAsync(fixedAssetModel,2,1));
            Assert.Equal("Error en la base de datos.", ex.Result.Message);
        }

        [Fact]
        public void CreateFixedAsset_ReturnsNotCreatedFixedAsset()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetEntity = new FixedAssetEntity() { };
            var fixedAssetModel = new FixedAssetModel() {AssetStateId=1 };
            var assetCategory = new AssetCategoryEntity()
            {
                Id = 1,
                Category = "Teclados",
            };
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetAssetCategoryAsync(1)).ReturnsAsync(assetCategory);
            fixedAssetRepositoryMock.Setup(r => r.GetProgramHouseAsync(2)).ReturnsAsync(new ProgramHouseEntity());
            fixedAssetRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(new AssetStateEntity());
            fixedAssetRepositoryMock.Setup(r => r.CreateFixedAsset(fixedAssetEntity,2,1));
            fixedAssetRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await fixedAssetService.CreateFixedAssetAsync(fixedAssetModel,2,1));
            Assert.Equal("Ocurrio un error al crear el Activo Fijo, faltan datos o paso algo inesperado.", ex.Result.Message);
        }
    }
}
