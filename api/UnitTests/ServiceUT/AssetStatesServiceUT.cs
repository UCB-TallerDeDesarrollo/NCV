using AutoMapper;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ServiceUT
{
    public class AssetStatesServiceUT
    {
        [Fact]
        public async Task CreateAssetState_ReturnsAddedAssetState()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();           
            var assetStateEntity = new AssetStateEntity()
            {
                Id = 1,                
                State = "Obsoleto"
            };
            var assetStateModel = mapper.Map<AssetStateModel>(assetStateEntity);
            var assetStateRepositoryMock = new Mock<INCVRepository>();

            assetStateRepositoryMock.Setup(r => r.CreateAssetState(assetStateEntity));
            assetStateRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var assetStateAdded = await assetStateService.CreateAssetStateAsync (assetStateModel);
            Assert.Equal("Obsoleto", assetStateAdded.State);
        }

        [Fact]
        public async Task GetAssetStates_ReturnAllAssetStates()
        {           
            var assetState1 = new AssetStateEntity()
            {
                Id = 1,               
                State = "Obsoleto"
            };

            var assetState2 = new AssetStateEntity()
            {
                Id = 2,
                State = "Regular"
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<AssetStateEntity>() { assetState1, assetState2 } as IEnumerable<AssetStateEntity>;
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(e => e.GetAssetStatesAsync()).ReturnsAsync(enumerable);
            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var listAssetStates = await assetStateService.GetAssetStatesAsync();
            Assert.Equal(2, listAssetStates.Count());
        }

        [Fact]
        public async Task GetAssetState_ReturnIdAssetState()
        {          
            var assetState1 = new AssetStateEntity()
            {
                Id = 1,               
                State = "Obsoleto"
            };

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(assetState1);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var assetState = await assetStateService.GetAssetStateAsync(1);
            Assert.Equal(1, assetState.Id);
        }

        [Fact]
        public async Task GetAssetState_AssetStateDeletedTrue()
        {
            var assetState1 = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
                Deleted = true
            };

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(assetState1);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await assetStateService.GetAssetStateAsync(1));
            Assert.Equal($"El estado con Id:1 no existe.", ex.Result.Message);
        }

        [Fact]
        public void GetAssetState_ReturnNotFoundIdAssetState()
        {           
            AssetStateEntity assetState = new AssetStateEntity() { State = "Obsoleto" };

            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(r => r.GetAssetStateAsync(1)).ReturnsAsync(assetState);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await assetStateService.GetAssetStateAsync(2));
            Assert.Equal($"El estado con Id:2 no existe.", ex.Result.Message);
        }

        [Fact]
        public void GetAssetStates_ReturnNotFoundAssetStates()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<AssetStateEntity>() { } as IEnumerable<AssetStateEntity>;
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(r => r.GetAssetStatesAsync()).ReturnsAsync(enumerable);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<NotFoundElementException>(async () => await assetStateService.GetAssetStatesAsync());
            Assert.Equal("La lista de estados no existe o está vacía.", ex.Result.Message);
        }

        [Fact]
        public void CreateAssetState_ReturnsDataBaseErrorCreatingAssetState()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var assetStateEntity = new AssetStateEntity() { };
            var assetStateModel = new AssetStateModel() { Id = 1 };
            var assetStateRepositoryMock = new Mock<INCVRepository>();
            assetStateRepositoryMock.Setup(r => r.CreateAssetState(assetStateEntity));
            assetStateRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(false);

            var assetStateService = new AssetStateService(assetStateRepositoryMock.Object, mapper);
            var ex = Assert.ThrowsAsync<Exception>(async () => await assetStateService.CreateAssetStateAsync(assetStateModel));
            Assert.Equal("Database Error.", ex.Result.Message);
        }       
    }
}
