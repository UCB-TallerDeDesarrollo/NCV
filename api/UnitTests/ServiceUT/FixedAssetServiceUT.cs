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
    }
}
