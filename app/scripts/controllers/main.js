'use strict';

angular
	.module('blockChainClientApp')
  	.controller('MainCtrl', function ($scope,Restangular) {

  		console.log("Controller loaded");
  		var transactionsHash = [];

  		$scope.init = function(){
  			Restangular.all('accounts').all('currency').all('all').getList().then(function(result){
  				$scope.accounts = result.plain();
  			});
  		}

  		$scope.refreshAccounts = function(){
			Restangular.all('accounts').all('currency').all('all').getList().then(function(result){
  				$scope.accounts = result.plain();
  			});
  		}

  		$scope.resetForm = function(){
  			$scope.transaction = {};
  		}

  		$scope.submit = function(){
  			Restangular.all('transactions').post($scope.transaction).then(
  				function(result){ 
  					transactionsHash.push(result.plain());
  					$scope.refreshAccounts();
  					$scope.resetForm();
  				},function(error){
  					console.log(error);
  				});
  		}

  		$scope.searchTransaction = function(transactionAddress){
  			console.log("searchTransaction : " + transactionAddress);
  			Restangular.one('transactions').one('address').one(transactionAddress).get().then(function(result){
  				console.log(result);
  				//$scope.transactionResult = result.plain();
  			});
  		}

  		$scope.searchAllTransactionFromAccount = function(accountAddress){
  			Restangular.one('transactions').one('account').one(accountAddress).get().then(function(result){
  				$scope.transactionsByAccount = result.plain();
  				console.log($scope.transactionsByAccount);
  			});
  		}

  		$scope.getBlockInformations = function(blockNumber){
  			console.log("blockNumber:" + blockNumber);
  			Restangular.one('transactions').one('block').one(blockNumber).get().then(function(result){
  				$scope.block = result.plain();
  				console.log($scope.block);
  			});
  		}

});
