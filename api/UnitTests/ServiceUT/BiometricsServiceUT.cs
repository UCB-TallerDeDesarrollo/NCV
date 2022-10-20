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
using UnitTests.NCVRepositoryUT;
namespace UnitTests.ServiceUT
{
    public class BiometricsServiceUT
    {
        [Fact]
        public async Task GetBiometricsAsync_BiometricsRegistered_ReturnsListOfBiometricsModel()
        {
            //ARRANGE
            int kidId = 1;
            var kid1 = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            var biometricsModel1 = new BiometricsModel() { Height = 90, Weight = 35.5m, RegisterDate = new DateTime(2015, 12, 25) };
            var biometricsModel2 = new BiometricsModel() { Height = 92, Weight = 38.5m, RegisterDate = new DateTime(2016, 1, 25) };
            var biometricsEntity1 = new BiometricsEntity(){ Id = 1, KidId = 1, Kid = kid1, Height = 90, Weight = 35.5m, RegisterDate = new DateTime(2015, 12, 25) };
            var biometricsEntity2 = new BiometricsEntity(){ Id = 2, KidId = 1, Kid = kid1, Height = 92, Weight = 38.5m, RegisterDate = new DateTime(2016, 1, 25) };
            var biometricsEnumerable = new List<BiometricsEntity>() { biometricsEntity1, biometricsEntity2 } as IEnumerable<BiometricsEntity>;


            var repositoryMock = new Mock<INCVRepository>();
            repositoryMock.Setup(s => s.GetBiometricsAsync(kidId)).ReturnsAsync(biometricsEnumerable);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var biometricsService = new BiometricsService(repositoryMock.Object,mapper);

            //ACT
            var actualBiometricsModelList = (IList<BiometricsModel>) await biometricsService.GetBiometricsAsync(kidId);
            
            //ASSERT
            Assert.Equal(2, actualBiometricsModelList.Count());
            Assert.Equal(biometricsModel2.Height, actualBiometricsModelList[1].Height);
        }
    }
}
