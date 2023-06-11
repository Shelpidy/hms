import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class Patient extends Model {
  public patientId!: number;
  public userId!: number;
  public diagnosis!: string;
  public bloodGroupId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    diagnosis: {
      type: DataTypes.STRING(800),
    },
    bloodGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BloodGroups',
        key: 'bloodGroupId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'Patients',
    timestamps: true,
    underscored: false,
  }
);

export default Patient;
