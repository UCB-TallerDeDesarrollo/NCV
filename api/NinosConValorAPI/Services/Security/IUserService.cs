using NinosConValorAPI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Services.Security
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);
        Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);

        Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model);
        Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model);
        Task<IEnumerable<UserBasicInformationModel>> GetUsersAsync();
        Task<EditUserViewModel> GetUserByIdAsync(string userId);
        Task<UserManagerResponse> UpdateUsersAsync(EditUserViewModel model, string userId);
        Task<UserManagerResponse> DeleteUserAsync(string userId);

        //Roles
        Task<UserManagerResponse> RegisterUserRole(RegisterViewModel model, string role);
        Task<UserManagerResponse> ChangePassword(ChangePassword model);
        Task<UserManagerResponse> RegisterSuperUserAsync(RegisterViewModel model);





    }
}
