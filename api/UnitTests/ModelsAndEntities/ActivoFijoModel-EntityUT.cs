using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ModelsAndEntities
{
    public class ActivoFijoModel_EntityUT
    {
        [Fact]
        public void ModelFixedAsset_ReturnsFixedAssetModel()
        {
            //Arrange
            var fixedAssetmodel = new FixedAssetModel()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001,3,2),
                Price = 100.58m,
                Features = "8Gb de RAM",
            };           


            Assert.Equal(1, fixedAssetmodel.Id);
            Assert.Equal("TEC-489", fixedAssetmodel.Code);
            Assert.Equal("Computadora", fixedAssetmodel.Name);
            Assert.Equal("Computadora de escritorio", fixedAssetmodel.Description);
            Assert.Equal(new DateTime(2001, 3, 2), fixedAssetmodel.EntryDate);
            Assert.Equal(100.58m, fixedAssetmodel.Price);
            Assert.Equal("8Gb de RAM", fixedAssetmodel.Features);
        }

        [Fact]
        public void FixedAssetEntity_ReturnsFixedAssetEntity()
        {
            //Arrange
            var fixedAssetEntity = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
            };


            Assert.Equal(1, fixedAssetEntity.Id);
            Assert.Equal("TEC-489", fixedAssetEntity.Code);
            Assert.Equal("Computadora", fixedAssetEntity.Name);
            Assert.Equal("Computadora de escritorio", fixedAssetEntity.Description);
            Assert.Equal(new DateTime(2001, 3, 2), fixedAssetEntity.EntryDate);
            Assert.Equal(100.58m, fixedAssetEntity.Price);
            Assert.Equal("8Gb de RAM", fixedAssetEntity.Features);
        }
    }
}
