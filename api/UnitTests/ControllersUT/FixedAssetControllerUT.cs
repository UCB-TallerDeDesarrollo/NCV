using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Controllers;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ControllersUT
{
    public class FixedAssetControllerUT
    {
        [Fact]
        public async Task CreateFixedAsset_AddFixedAsset_ReturnsAddedFixedAsset()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var fixedAssetModel = new FixedAssetModel()
            {
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };           

            var fixedAssetServiceMock = new Mock<IFixedAssetService>();
            fixedAssetServiceMock.Setup(r => r.CreateFixedAssetAsync(fixedAssetModel)).ReturnsAsync(new FixedAssetModel()
            {
                Id=1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            });

            var fixedAssetController = new FixedAssetsController(fixedAssetServiceMock.Object);
            var response = await fixedAssetController.CreateFixedAssetAsync(fixedAssetModel);
            var status = response.Result as CreatedResult;
            var fixedAssetAdded = status.Value as FixedAssetModel;            

            Assert.Equal("Computadora", fixedAssetAdded.Name);
            Assert.Equal(1, fixedAssetAdded.Id);
            Assert.Equal(201, status.StatusCode);
        }

        [Fact]
        public async Task GetFixedAssets_ReturnAllFixedAssets()
        {
            var fixedAsset1 = new FixedAssetModel()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };

            var fixedAsset2 = new FixedAssetModel()
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
            var enumerable = new List<FixedAssetModel>() { fixedAsset1, fixedAsset2 } as IEnumerable<FixedAssetModel>;
            var fixedAssetServiceMock = new Mock<IFixedAssetService>();
            fixedAssetServiceMock.Setup(r => r.GetFixedAssetsAsync()).ReturnsAsync(enumerable);

            var fixedAssetController = new FixedAssetsController(fixedAssetServiceMock.Object);
            var response = await fixedAssetController.GetFixedAssetsAsync();
            var status = (OkObjectResult)response.Result;
            var fixedAssetsList = status.Value as List<FixedAssetModel>;
            var countFixedAssetsList = fixedAssetsList.Count();
            Assert.Equal(2, countFixedAssetsList);
            Assert.Equal(200, status.StatusCode);
        }

        [Fact]
        public async Task GetFixedAsset_ReturnStatusFixedAsset()
        {
            var fixedAsset1 = new FixedAssetModel()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };

            var fixedAssetServiceMock = new Mock<IFixedAssetService>();
            fixedAssetServiceMock.Setup(r => r.GetFixedAssetAsync(1)).ReturnsAsync(fixedAsset1);

            var fixedAssetController = new FixedAssetsController(fixedAssetServiceMock.Object);
            var response = await fixedAssetController.GetFixedAssetAsync(1);
            var status = (OkObjectResult)response.Result;
            Assert.Equal(200, status.StatusCode);
        }
    }
}
