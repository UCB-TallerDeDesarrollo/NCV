using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class assetTypeAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetCategory_AssetCategoryId",
                table: "FixedAsset");

            migrationBuilder.RenameColumn(
                name: "AssetCategoryId",
                table: "FixedAsset",
                newName: "AssetTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_FixedAsset_AssetCategoryId",
                table: "FixedAsset",
                newName: "IX_FixedAsset_AssetTypeId");

            migrationBuilder.CreateTable(
                name: "AssetTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: false),
                    AssetCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetTypes_AssetCategory_AssetCategoryId",
                        column: x => x.AssetCategoryId,
                        principalTable: "AssetCategory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetTypes_AssetCategoryId",
                table: "AssetTypes",
                column: "AssetCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetTypes_AssetTypeId",
                table: "FixedAsset",
                column: "AssetTypeId",
                principalTable: "AssetTypes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetTypes_AssetTypeId",
                table: "FixedAsset");

            migrationBuilder.DropTable(
                name: "AssetTypes");

            migrationBuilder.RenameColumn(
                name: "AssetTypeId",
                table: "FixedAsset",
                newName: "AssetCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_FixedAsset_AssetTypeId",
                table: "FixedAsset",
                newName: "IX_FixedAsset_AssetCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetCategory_AssetCategoryId",
                table: "FixedAsset",
                column: "AssetCategoryId",
                principalTable: "AssetCategory",
                principalColumn: "Id");
        }
    }
}
