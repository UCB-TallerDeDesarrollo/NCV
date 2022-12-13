using Microsoft.EntityFrameworkCore.Metadata;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ModelsAndEntities
{
    public class KidModel_EntityUT
    {
        [Fact]
        public void ModelKid_ReturnsKid()
        {
            //Arrange
            var kidmodel = new KidModel()
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


            Assert.Equal(1, kidmodel.Id);
            Assert.Equal("Manuel", kidmodel.FirstName);
            Assert.Equal("Flores", kidmodel.LastName);
            Assert.Equal("1234567", kidmodel.CI);
            Assert.Equal(new DateTime(2010,9,12), kidmodel.BirthDate);
            Assert.Equal("SDA", kidmodel.ProgramHouse);
            Assert.Equal("Cochabamba", kidmodel.BirthPlace);
            Assert.Equal("masculino", kidmodel.Gender);


        }
        [Fact]
        public void KidEntity_ReturnsKidEntity()
        {
            //Arrange
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = new ProgramHouseEntity() { Id = 2, Name = "Sendero de Esperanza" },
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };


            Assert.Equal(1, kidEntity.Id);
            Assert.Equal("Manuel", kidEntity.FirstName);
            Assert.Equal("Flores", kidEntity.LastName);
            Assert.Equal("1234567", kidEntity.CI);
            Assert.Equal(new DateTime(2010, 9, 12), kidEntity.BirthDate);
            Assert.Equal("Cochabamba", kidEntity.BirthPlace);
            Assert.Equal("masculino", kidEntity.Gender);


        }
    }
}
