using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Models.Security;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NinosConValorAPI.Services.Security
{
    public class UserService : IUserService
    {
        private UserManager<IdentityAppUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        private IConfiguration configuration;

        public UserService(UserManager<IdentityAppUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        public async Task<UserManagerResponse> LoginUserAsync(LoginViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return new UserManagerResponse
                {
                    Token = "There is no user with that Email address",
                    IsSuccess = false,
                };
            }

            var result = await userManager.CheckPasswordAsync(user, model.Password);

            if (!result)
                return new UserManagerResponse
                {
                    Token = "Invalid password",
                    IsSuccess = false,
                };

            var roles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>()
            {
                new Claim("Email", model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(
                issuer: configuration["AuthSettings:Issuer"],
                audience: configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
            
            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
            //aca muere
            return new UserManagerResponse
            {
                Token = tokenAsString,
                IsSuccess = true,
                ExpireDate = token.ValidTo
            };
        }

        public async Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("model is null");
            }

            if (model.Password != model.ConfirmPassword)
                return new UserManagerResponse
                {
                    Token = "Confirm password doesn't match the password",
                    IsSuccess = false,
                };

            var identityUser = new IdentityAppUser
            {
                Email = model.Email,
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.CellPhone,
                State = 1
            };

            var result = await userManager.CreateAsync(identityUser, model.Password);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = "User created successfully!",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Token = "User did not create",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model)
        {

            var identityRole = new IdentityRole()
            {
                Name = model.Name,
                NormalizedName = model.NormalizedName//,
                //State = 1
            };

            var result = await roleManager.CreateAsync(identityRole);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = "Role created successfully!",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Token = "Role did not create",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model)
        {
            var role = await roleManager.FindByIdAsync(model.RoleId);
            if (role == null)
            {
                return new UserManagerResponse
                {
                    Token = "Role does not exist",
                    IsSuccess = false
                };
            }

            var user = await userManager.FindByIdAsync(model.UserId);
            if (role == null)
            {
                return new UserManagerResponse
                {
                    Token = "user does not exist",
                    IsSuccess = false
                };
            }

            if (await userManager.IsInRoleAsync(user, role.Name))
            {
                return new UserManagerResponse
                {
                    Token = "user has role already",
                    IsSuccess = false
                };
            }

            var result = await userManager.AddToRoleAsync(user, role.Name);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = "Role assigned",
                    IsSuccess = true
                };
            }

            return new UserManagerResponse
            {
                Token = "something went wrong",
                IsSuccess = false
            };
        }
        public async Task<UserManagerResponse> RegisterAdminUserAsync(RegisterViewModel model)
        {
            return await RegisterUserRole(model, "AdminUser");

        }

        public async Task<UserManagerResponse> RegisterAuntUserAsync(RegisterViewModel model)
        {
            return await RegisterUserRole(model, "AdminUser");

        }

        public async Task<UserManagerResponse> RegisterUserRole(RegisterViewModel model, string role)
        {
            var registeredUserResponse = await RegisterUserAsync(model);
            if (!registeredUserResponse.IsSuccess) return registeredUserResponse;

            var user = await userManager.FindByEmailAsync(model.Email);
            var userId = user.Id;

            var adminRole = await roleManager.FindByNameAsync(role);
            var adminRoleId = adminRole.Id;

            var userRoleModel = new CreateUserRoleViewModel()
            {
                UserId = userId,
                RoleId = adminRoleId
            };

            var assignedRoleResponse = await CreateUserRoleAsync(userRoleModel);
            if (!assignedRoleResponse.IsSuccess) return assignedRoleResponse;

            return new UserManagerResponse
            {
                Token = $"User created successfully with {role} Role!",
                IsSuccess = true,
            };
        }
    }
}
