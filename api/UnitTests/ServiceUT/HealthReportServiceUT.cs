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

namespace UnitTests.ServiceUT
{
    public class HealthReportServiceUT
    {
        [Fact]
        public async Task CreateHealthReportAsync_HealthReportAddedToACreatedKid_ReturnsSameHealthReportWithId()
        {

            // ARRANGE
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var healthReportModel = new HealthReportModel()
            {
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };
            var healthReportEntity = new HealthReportEntity()
            {
                Id = 1,
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };

            int kidId = 1;
            var ncvRepositoryMock = new Mock<INCVRepository>();
            
            ncvRepositoryMock.Setup(r => r.CreateHealthReportAsync(It.IsAny<HealthReportEntity>())).ReturnsAsync(healthReportEntity);
            ncvRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);
            //It.IsAny<HealthReportEntity>() // define la firma del metodo
            //Para que la llamada al interior al metodo simulado del repo CreateHealthReportAsync() reciba el parametro
            //https://stackoverflow.com/a/53649215/18366207
            //To understant It.IsAny (min 8 parece) https://docs.microsoft.com/en-us/shows/visual-studio-toolbox/unit-testing-moq-framework


            var healthReportsService = new HealthReportService(ncvRepositoryMock.Object,mapper);

            // ACT
            var healthReportCreated = await healthReportsService.CreateHealthReportAsync(kidId, healthReportModel);

            // ASSERT
            Assert.Equal(1, healthReportCreated.KidId);
            Assert.Equal("ORH+", healthReportCreated.BloodType);
            Assert.Equal(1, healthReportCreated.Id);
        }
        [Fact]
        public async Task GetHealthReportAsync_GetAnExistingHealthReport_ReturnsHealthReportModel()
        {
            // ARRANGE
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var healthReportEntity = new HealthReportEntity()
            {
                Id = 1,
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Checo",
                LastName = "Perez"
            };

            int kidId = 1;

            var ncvRepositoryMock = new Mock<INCVRepository>();


            ncvRepositoryMock.Setup(r => r.GetHealthReportAsync(kidId)).ReturnsAsync(healthReportEntity);
            ncvRepositoryMock.Setup(r => r.GetKidAsync(kidId)).ReturnsAsync(kidEntity);

            var healthReportsService = new HealthReportService(ncvRepositoryMock.Object,mapper);

            // ACT
            var returnedHealthReport = await healthReportsService.GetHealthReportAsync(kidId);

            // ASSERT
            Assert.Equal(1, returnedHealthReport.KidId);
            Assert.Equal("ORH+", returnedHealthReport.BloodType);
            Assert.Equal(1, returnedHealthReport.Id);
        }
    }
}
