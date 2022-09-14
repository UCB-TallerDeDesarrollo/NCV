using AutoMapper;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
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
        public async Task CreateFixesAsset_AddFixedAsset_ReturnsAddedFixedAsset()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetModel = new FixedAssetModel()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };
            var fixedAssetEntity = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };

            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.CreateFixedAsset(fixedAssetEntity));
            fixedAssetRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var fixedAssetAdded = await fixedAssetService.CreateFixedAssetAsync(fixedAssetModel);
            Assert.Equal("Computadora",fixedAssetAdded.Name);
        }

        [Fact]
        public async Task GetFixedAssets_ReturnAllFixedAssets()
        {
            var fixedAsset1 = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };

            var fixedAsset2 = new FixedAssetEntity()
            {
                Id = 2,
                Name = "Silla",
                Description = "Silla de Madera",
                EntryDate = new DateTime(2006, 6, 6),
                Price = 20.32m,
                Features = "Tachas de oro",
                Quantity = 1
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<FixedAssetEntity>() { fixedAsset1, fixedAsset2 } as IEnumerable<FixedAssetEntity>;
            var fixedAssetRepositoryMock = new Mock<INCVRepository>();
            fixedAssetRepositoryMock.Setup(r => r.GetFixedAssetsAsync()).ReturnsAsync(enumerable);

            var fixedAssetService = new FixedAssetService(fixedAssetRepositoryMock.Object, mapper);
            var listFixedAssets = await fixedAssetService.GetFixedAssetsAsync();
            Assert.Equal(2, listFixedAssets.Count());
        }
    }
}
