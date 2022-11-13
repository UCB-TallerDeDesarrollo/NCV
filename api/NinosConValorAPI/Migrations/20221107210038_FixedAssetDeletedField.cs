using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class FixedAssetDeletedField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Active",
                table: "FixedAsset",
                newName: "Deleted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "FixedAsset",
                newName: "Active");
        }
    }
}
