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
using NinosConValorAPI.Models.Security;
using NinosConValorAPI.Services.Security;
using NinosConValorAPI.Controllers;

namespace UnitTests.ControllersUT
{
    public class UserServiceUT
    {
        [Fact]
        public async Task LoginUser_ReturnSuccesfulAndToken()
        {
            //ARRANGE
            var loginModel = new LoginViewModel()
            {
                Email = "soprteNCV@gmail.com",
                Password = "Soporte!23"
            };
            var userResponseModel = new UserManagerResponse()
            {
                Token = "abcdSuperSecret",
                IsSuccess = true,
                Errors = new List<string>(),
                ExpireDate = DateTime.Now,
            };
            var loginServiceMock = new Mock<IUserService>();
            loginServiceMock.Setup(r => r.LoginUserAsync(loginModel)).ReturnsAsync(userResponseModel);

            //ACT
            var loginController = new AuthController(loginServiceMock.Object);
            var response = await loginController.LoginAsync(loginModel);
            var status = response.Result as OkObjectResult;
            var userResponse = status.Value as UserManagerResponse;

            //ASSERT
            Assert.True(userResponse.IsSuccess);
        }
    }
}
