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

        public async Task<IEnumerable<UserBasicInformationModel>> GetUsersAsync( )
        {
            var userBasicInformation = new List<UserBasicInformationModel>();
            var userList = userManager.Users.ToList();
            //var userBasicInfomodel = new UserBasicInformation();
           
            foreach (var user in userList)
            {
                var aux =  await userManager.GetRolesAsync(user);
                if (aux.Count >0)
                {
                    var userBasicInfomodel = new UserBasicInformationModel
                    {
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        CellPhone = user.PhoneNumber,
                        NameRole = aux[0],
                        Id = user.Id,

                    };

                    userBasicInformation.Add(userBasicInfomodel);
                }
                else
                {
                    /*var userBasicInfomodel = new UserBasicInformationModel
                    {
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        CellPhone = user.PhoneNumber,
                        NameRole = "Rol no asignado",
                        Id = user.Id,

                    };

                    userBasicInformation.Add(userBasicInfomodel);*/
                    throw new NotFoundElementException($"El usuario " +user.UserName+ "no tiene asignado un rol");
                }
            }
            if (userBasicInformation == null || !userBasicInformation.Any())
                throw new NotFoundElementException($"No se encontraron usuarios registrados");

            return userBasicInformation;
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
        

        public async Task<UserManagerResponse> RegisterUserRole(RegisterViewModel model, string role)
        {
            var registeredUserResponse = await RegisterUserAsync(model);
            if (!registeredUserResponse.IsSuccess) return registeredUserResponse;

            var user = await userManager.FindByEmailAsync(model.Email);
            var userId = user.Id;

            var nameRole = await roleManager.FindByNameAsync(role);
            var roleId = nameRole.Id;

            var userRoleModel = new CreateUserRoleViewModel()
            {
                UserId = userId,
                RoleId = roleId
            };

            var assignedRoleResponse = await CreateUserRoleAsync(userRoleModel);
            if (!assignedRoleResponse.IsSuccess) return assignedRoleResponse;

            return new UserManagerResponse
            {
                Token = $"User created successfully with {role} Role!",
                IsSuccess = true,
            };
        }

        public async Task<EditUserViewModel> GetUserByIdAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            var aux = await userManager.GetRolesAsync(user);

            Console.WriteLine(aux);
            if (user == null)
            {
                throw new NotFoundElementException($"The user doesn't exists");
            }
            return new EditUserViewModel
            {
                //Id = user.Id,
                Email = user.Email,
                CellPhone = user.PhoneNumber,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role= aux[0]
            };
        }

        
        public async Task<UserManagerResponse> UpdateUsersAsync(EditUserViewModel model, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            var actuallyRole = await userManager.GetRolesAsync(user);
            if (user == null)
            {
                return new UserManagerResponse
                {
                    Token = "user does not exist",
                    IsSuccess = false
                };
            }
            if(model.Role != actuallyRole[0])
            {
                var roleValidate = await roleManager.FindByNameAsync(model.Role);
                if (roleValidate != null)
                {
                    await userManager.RemoveFromRoleAsync(user, actuallyRole[0]);
                    await userManager.AddToRoleAsync(user, model.Role);
                }
            }
            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.PhoneNumber = model.CellPhone ?? user.PhoneNumber;
            user.Email = model.Email ?? user.Email;
            user.UserName = model.Email ?? user.UserName;

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = $"User updated successfully",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Token = $"Something happened",
                IsSuccess = false,
            };
        }
        public async Task<UserManagerResponse> DeleteUserAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new UserManagerResponse
                {
                    Token = "user does not exist",
                    IsSuccess = false
                };
            }
            
            var result = await userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = $"User deleted successfully",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Token = $"Something happened",
                IsSuccess = false,
            };
        }

        public async Task<UserManagerResponse> ChangePassword(ChangePassword model)
        {
            var user = await userManager.FindByIdAsync(model.IdUser);
            var respons = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Token = $"User change password successfully",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Token = $"Something happened",
                IsSuccess = false,
            };
        }
    }
}
