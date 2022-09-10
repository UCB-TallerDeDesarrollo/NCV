using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Controllers;
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
        public async Task CreateFixesAsset_AddFixedAsset_ReturnsAddedFixedAsset()
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
    }
}
