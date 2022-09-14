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
    public class KidControllerUT
    {

        [Fact]
        public async Task GetKid_ReturnStatusFixedAsset()
        {
            var kid1 = new KidModel()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010,9,12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender="masculino"
            };

            var kidServiceMock = new Mock<IKidService>();
            kidServiceMock.Setup(r => r.GetKidAsync(1)).ReturnsAsync(kid1);

            var kidController = new KidsController(kidServiceMock.Object);
            var response = await kidController.GetKidAync(1);
            var status = (OkObjectResult)response.Result;
            Assert.Equal(200, status.StatusCode);

        }
    }
}
