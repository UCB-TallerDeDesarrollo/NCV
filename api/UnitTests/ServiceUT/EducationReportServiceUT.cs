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
    public class EducationReportServiceUT
    {
        [Fact]
        public async Task CreateEducationReportAsync_EducationReportAddedToACreatedKid_ReturnsSameEducationReportWithId()
        {

            // ARRANGE
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var educationReportModel = new EducationReportModel()
            {
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };
            var educationReportEntity = new EducationReportEntity()
            {
                Id = 1,
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };

            int kidId = 1;
            var ncvRepositoryMock = new Mock<INCVRepository>();

            ncvRepositoryMock.Setup(r => r.CreateEducationReportAsync(It.IsAny<EducationReportEntity>())).ReturnsAsync(educationReportEntity);
            ncvRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var educationReportsService = new EducationReportService(ncvRepositoryMock.Object,mapper);

            // ACT
            var educationReportCreated = await educationReportsService.CreateEducationReportAsync(kidId, educationReportModel);

            // ASSERT
            Assert.Equal(1, educationReportCreated.KidId);
            Assert.Equal("", educationReportCreated.Grade);
            Assert.Equal(1, educationReportCreated.Id);
        }
    }
}
