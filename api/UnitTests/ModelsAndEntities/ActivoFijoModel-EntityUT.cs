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
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001,3,2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };           


            Assert.Equal(1, fixedAssetmodel.Id);
            Assert.Equal("Computadora", fixedAssetmodel.Name);
            Assert.Equal("Computadora de escritorio", fixedAssetmodel.Description);
            Assert.Equal(new DateTime(2001, 3, 2), fixedAssetmodel.EntryDate);
            Assert.Equal(100.58m, fixedAssetmodel.Price);
            Assert.Equal("8Gb de RAM", fixedAssetmodel.Features);
            Assert.Equal(5, fixedAssetmodel.Quantity);


        }

        [Fact]
        public void FixedAssetEntity_ReturnsFixedAssetEntity()
        {
            //Arrange
            var fixedAssetEntity = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };


            Assert.Equal(1, fixedAssetEntity.Id);
            Assert.Equal("Computadora", fixedAssetEntity.Name);
            Assert.Equal("Computadora de escritorio", fixedAssetEntity.Description);
            Assert.Equal(new DateTime(2001, 3, 2), fixedAssetEntity.EntryDate);
            Assert.Equal(100.58m, fixedAssetEntity.Price);
            Assert.Equal("8Gb de RAM", fixedAssetEntity.Features);
            Assert.Equal(5, fixedAssetEntity.Quantity);


        }
    }
}
