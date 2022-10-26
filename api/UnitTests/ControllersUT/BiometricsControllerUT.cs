using Microsoft.AspNetCore.Mvc;
using Moq;
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
    public class BiometricsControllerUT
    {
        [Fact]
        public async Task GetBiometricsAsync_KidBiometricsRegistered_ReturnsListOfBiometricsModel()
        {
            //ARRANGE
            int kidId = 1;
            var biometricsModel = new BiometricsModel() { Height = 90, Weight = 35.5m, RegisterDate = new DateTime(2015, 12, 25) };
            var biometricsServiceMock = new Mock<IBiometricsService>();
            biometricsServiceMock.Setup(s=>s.GetBiometricsAsync(kidId)).ReturnsAsync(new List<BiometricsModel>() { biometricsModel } );
            var biometricsController = new BiometricsController(biometricsServiceMock.Object);

            //ACT
            var response = await biometricsController.GetBiometricsAsync(kidId);
            var result = response.Result as OkObjectResult;
            var actualBiometricsList = result.Value as IEnumerable<BiometricsModel>;

            //ASSERT
            Assert.Contains(biometricsModel, actualBiometricsList);
            Assert.Equal(200, result.StatusCode);

        }
        [Fact]
        public async Task CreateBiometricsAsync_KidBiometricsAdded_ReturnsSavedDataBiometricsModel()
        {
            //ARRANGE
            int kidId = 1;
            var biometricsModel = new BiometricsModel() { Height = 90, Weight = 35.5m, RegisterDate = new DateTime(2015, 12, 25) }; // FromBody
            var biometricsServiceMock = new Mock<IBiometricsService>();
            biometricsServiceMock.Setup(s=>s.CreateBiometricsAsync(kidId,biometricsModel)).ReturnsAsync(new BiometricsModel() {
                Height = 90, 
                Weight = 35.5m, 
                RegisterDate = new DateTime(2015, 12, 25)
             } );

            var biometricsController = new BiometricsController(biometricsServiceMock.Object);

            //ACT
            var response = await biometricsController.CreateBiometricsAsync(kidId,biometricsModel);
            var result = response.Result as CreatedResult;
            var biometricsDataCreated = result.Value as BiometricsModel;

            //ASSERT
            Assert.Equal(90, biometricsDataCreated.Height );
            Assert.Equal(35.5m, biometricsDataCreated.Weight );
            Assert.Equal(new DateTime(2015, 12, 25), biometricsDataCreated.RegisterDate);
            Assert.Equal(201, result.StatusCode);
        }

        
    }
}
