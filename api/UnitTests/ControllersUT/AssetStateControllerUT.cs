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
    public class AssetStateControllerUT
    {
        [Fact]
        public async Task CreateAssetState_AddAssetState_ReturnsAddedAssetState()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetStateModel = new AssetStateModel()
            {                
                State = "Obsoleto"
            };

            var assetStateServiceMock = new Mock<IAssetStateService>();
            assetStateServiceMock.Setup(r => r.CreateAssetStateAsync(assetStateModel)).ReturnsAsync(new AssetStateModel()
            {
                Id = 1,                
                State = "Obsoleto"
            });

            var assetStateController = new AssetStateController(assetStateServiceMock.Object);
            var response = await assetStateController.CreateAssetStateAsync(assetStateModel);
            var status = response.Result as CreatedResult;
            var assetStateAdded = status.Value as AssetStateModel;

            Assert.Equal("Obsoleto", assetStateAdded.State);
            Assert.Equal(1, assetStateAdded.Id);
            Assert.Equal(201, status.StatusCode);
        }

        [Fact]
        public async Task GetAssetStates_ReturnAllAssetStates()
        {
            var assetState1 = new AssetStateModel()
            {
                Id = 1,               
                State = "Obsoleto"
            };

            var assetState2 = new AssetStateModel()
            {
                Id = 2,                
                State = "Regular"
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<AssetStateModel>() { assetState1, assetState2 } as IEnumerable<AssetStateModel>;
            var assetStateServiceMock = new Mock<IAssetStateService>();
            assetStateServiceMock.Setup(r => r.GetAssetStatesAsync()).ReturnsAsync(enumerable);

            var assetStateController = new AssetStateController(assetStateServiceMock.Object);
            var response = await assetStateController.GetAssetStatesAsync();
            var status = (OkObjectResult)response.Result;
            var assetStatesList = status.Value as List<AssetStateModel>;
            var countAssetStatesList = assetStatesList.Count();
            Assert.Equal(2, countAssetStatesList);
            Assert.Equal(200, status.StatusCode);
        }

        [Fact]
        public async Task GetAssetState_ReturnStatusAssetState()
        {
            var assetState1 = new AssetStateModel()
            {
                Id = 1,               
                State = "Obsoleto"
            };

            var assetStateServiceMock = new Mock<IAssetStateService>();
            assetStateServiceMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(assetState1);

            var assetStateController = new AssetStateController(assetStateServiceMock.Object);
            var response = await assetStateController.GetAssetStateAsync(1);
            var result = response.Result as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
        }
     
    }
}
