using AutoMapper;
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
    public class EducationReportsControllerUT
    {
        [Fact]
        public async Task CreateEducationReportAsync_EducationReportAddedToACreatedKid_ReturnsSameEducationReportWithId()
        {
            // ARRANGE
            var educationReportModel = new EducationReportModel()
            {
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };
            
            int kidId = 1;
            var educationReportServiceMock = new Mock<IEducationReportService>();
            educationReportServiceMock.Setup(r => r.CreateEducationReportAsync(kidId,educationReportModel)).ReturnsAsync(new EducationReportModel()
            {
                Id = 1,
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            });

            var educationReportsController = new EducationReportsController(educationReportServiceMock.Object);
            
            // ACT
            var response = await educationReportsController.CreateEducationReportAsync(kidId,educationReportModel);
            var status = response.Result as CreatedResult;
            var educationReportCreated = status.Value as EducationReportModel;

            // ASSERT
            Assert.Equal(1, educationReportCreated.KidId);
            Assert.Equal("Primero Secundaria", educationReportCreated.Grade);
            Assert.Equal(1, educationReportCreated.Id);
            Assert.Equal(201, status.StatusCode);
        }
        
    }
}
